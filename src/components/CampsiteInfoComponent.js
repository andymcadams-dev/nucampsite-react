import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input,
    Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { LocalForm, Control, Errors} from 'react-redux-form';

//Task 3
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>     
        </div>
    );            
}

function RenderComments({comments, addComment, campsiteId}){
        if (comments) {
            return (
                    <div className="col-md-5 m-1">
                        <h4>Comments</h4>
                        {comments.map((comment)=> {
                            return(
                            <div key={comment.id}>
                                <p>{comment.text}<br/>                                
                                --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: 
                                '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        );
                    })}
                {/*Task 1*/}    
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }
        return <div></div>
    }
    

//Task 1
    class CommentForm extends Component {
        constructor(props) {
            super(props);
//Task 2
            this.state = {
                isModalOpen: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }
        
        toggleModal() {
          this.setState({
            isModalOpen: !this.state.isModalOpen
          });
        }

        handleSubmit(values) {
          this.toggleModal();
          this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }

        
        
    render() {
        return(
            <React.Fragment>
            {/*Task 1*/}
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
             {/*Task 2*/}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                        {/*Task 2*/}
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <div className="form-group" >
                                        <Label htmlFor="rating">Rating</Label>
                                            <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                            <option>Select</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            </Control.select>
                                    </div>
                                    {/*Task 2*/}
                                    <div className="form-group">
                                        <Label htmlFor="author">Your Name</Label>
                                            <Control.text
                                            model=".author"
                                            id="author"
                                            name="author"
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
                                                        minLength: 'Must be 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                            }}
                                            />
                                    </div>
                                    <div className="form-group" >
                                        <Label htmlFor="text">Comment</Label>
                                        <Control.textarea 
                                        model=".text" 
                                        id="text" 
                                        name="text" 
                                        className="form-control" 
                                        rows="6" />
                                    </div>
                                    <Button 
                                    type="submit" 
                                    value="submit" 
                                    color="primary">
                                        Submit
                                    </Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
        </React.Fragment>
        )}
}
function CampsiteInfo(props){
  if(props.campsite){
      return ( 
          <div className="container">
              <div className="row">
              <div className="col">
              <Breadcrumb>
                          <BreadcrumbItem><Link to="/Directory">Directory</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                      </Breadcrumb>
                  <h2>{props.campsite.name}</h2>
                  <hr />
              </div>
          </div>
              <div className="row">
                  <RenderCampsite campsite={props.campsite} />
                  <RenderComments 
                  comments={props.comments} 
                  addComment={props.addComment}
                  campsiteId={props.campsite.id}
                  />
              </div>
          </div>
      );
  }
  return <div />;
      
  }        

export default CampsiteInfo;