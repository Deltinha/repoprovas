import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
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

  return (
    <>
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
              >
                {_class.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
    </>
  );
}
