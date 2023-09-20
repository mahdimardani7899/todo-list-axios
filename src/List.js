import React from 'react'
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { LuTrash } from "react-icons/lu";
import { ToastContainer } from "react-toastify";



const List = ({ data, changeStatus, removeTask }) => {
  return (
    <div>
      <Container>
        <Row>
          {data.map((item, id) => (
            <Col key={id} xl="3" lg="4" sm="6">
              <Card 
                text="dark"
                border={item.status ? "success" : "danger"}
                bg={item.status ? "success" : "white"}
                className="mb-3 h-75 pb-5" 
              >
                <Card.Body>
                  <Card.Title className='h25'>#{item.id}</Card.Title>
                  <Card.Title className='h50'> {item.title}</Card.Title>
                  {!item.status ?
                    <Button className='m-2'
                      variant={item.status ? "danger" : "success"}
                      onClick={() => changeStatus(id)}
                    >
                      {item.status ? "undone" : "done"}
                    </Button>
                    : null}

                  <Button className='m-2'
                    variant="danger"
                    onClick={() => removeTask(id)}
                  >
                    delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <ToastContainer />
    </div>
  )
}

export default List
