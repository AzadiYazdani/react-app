import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function NewCard() {
    return (
        // style={{ width: '18rem' }}
        <Card className="col-9 col-sm-6">
            <Card.Img variant="top" src="https://mdbootstrap.com/img/new/standard/nature/111.webp" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )

}