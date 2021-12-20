import { useEffect, useState } from 'react';
import { getExamsFromClass } from '../../services/repoprovas-api';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Exam } from '../../interfaces/Exam';

function Link({ href, target, children }: any) {
  return (
    <a
      href={href}
      target={target}
      style={{ display: 'inline-block', margin: '10px' }}
    >
      {children}
    </a>
  );
}

export default function ClassExams() {
  const classId = Number(useParams().id);
  const [exams, setExams]: any[] = useState([]);

  function groupByTypes(array: Exam[]) {
    return array.reduce((objectsByKeyValue: any, obj: any) => {
      const value = obj['type'];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  }

  useEffect(() => {
    getExamsFromClass(classId).then((res) => setExams(groupByTypes(res.data)));
  }, []);

  return (
    <Accordion style={{ width: '300px' }} className="m-5">
      {Object.keys(exams)
        .sort()
        .map((type, index) => (
          <Accordion.Item key={index} eventKey={JSON.stringify(index)}>
            <Accordion.Header>{type}</Accordion.Header>
            {exams[type].map((exam: any) => (
              <Accordion.Body
                href={exam.link}
                target="_blank"
                as={Link}
              >{`${exam.name} - ${exam.professor}`}</Accordion.Body>
            ))}
          </Accordion.Item>
        ))}
    </Accordion>
  );
}
