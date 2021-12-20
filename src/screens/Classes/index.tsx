import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { getClasses } from '../../services/repoprovas-api';

export default function Classes() {
  const [classes, setClasses]: any[] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClasses().then((res) => setClasses(groupByYear(res.data)));
  }, []);

  function groupByYear(array: any) {
    return array.reduce((objectsByKeyValue: any, obj: any) => {
      const value = obj['year'];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }
  console.log(classes);

  return (
    <div className="m-5 d-flex flex-column gap-4">
      {Object.keys(classes)
        .sort()
        .map((year, index) => (
          <ListGroup key={index}>
            <ListGroup.Item variant="primary">{year}</ListGroup.Item>
            {classes[year].map((_class: any) => (
              <ListGroup.Item
                key={_class.id}
                action
                onClick={() => navigate(`/classes/${_class.id}`)}
                className="d-flex justify-content-between"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{_class.name}</div>
                </div>
                <Badge pill>
                  {_class.exams.length > 0 && _class.exams.length}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
    </div>
  );
}
