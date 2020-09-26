import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
            return (
                <React.Fragment>
                    <Button outline className="fa fa-pencil fa-lg" onClick={this.toggleModal}> Submit Comment </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggelModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating"
                                                    className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                        </Control.select>
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required, 
                                                    minLength: minLength(2),
                                                    maxLength: maxLength(15)
                                                }}
                                            />
                                        <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="text">Comment</Label>
                                        <Control.textarea model=".text" id="text" name="text"
                                                rows="6"
                                                className="form-control"
                                                validators={{
                                                    required, 
                                                    minLength: minLength(10),
                                                    maxLength: maxLength(150)
                                                }}
                                            />
                                        <Errors
                                                className="text-danger"
                                                model=".text"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be at least 10 characters',
                                                    maxLength: 'Must be 150 characters or less'
                                                }}
                                            />
                                    </div>
                                    <Button type="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
    }
}

function RenderCampsite({campsite}){
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

function RenderComments({comments}){
        if (comments){
            return(
            <div className="col-md-5 m-1">
                <h4>COMMENTS:</h4>
                {comments.map(comments => <p key={comments.id}>{comments.text}<br/> --- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>)}
                <CommentForm/>
            </div>
            );
        } else {
            return (
                <div></div>
            );
    }
}

function CampsiteInfo(props) {
        if (props.campsite){
            return(
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            );
        } else {
            return (
                <div></div>
            );
        }
}

export default CampsiteInfo;