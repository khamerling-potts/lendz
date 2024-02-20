import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";

function Listing({ listing, currentUser }) {
  const user = listing.user;

  const editPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit your listing below</Popover.Header>
      <Popover.Body>
        <form>
          <input type="text" placeholder="new details"></input>
        </form>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Card className="h-100">
        <Card.Header>
          <small>{user.username}</small>
          {user.username === currentUser.username ? (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={editPopover}
            >
              <Button>Edit</Button>
            </OverlayTrigger>
          ) : null}
        </Card.Header>
        <Card.Body>
          <Card.Title>{listing.title}</Card.Title>
          <img src={listing.img_url} className="mx-auto img-fluid" />
          <Card.Text>{listing.description}</Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Subtitle>{listing.zip}</Card.Subtitle>
            <Card.Subtitle className="card-subtitle">
              {listing.meeting_place}
            </Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
      {/* 
         <div className="card h-100">
         <div className="card-body">
          <small>{user.username}</small>
          {user.username === currentUser.username ? (
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={editPopover}
            >
              <Button>Edit</Button>
            </OverlayTrigger>
          ) : null}
          <h5 className="card-title">{listing.title}</h5>
          <img src={listing.img_url} className="mx-auto img-fluid" />
          <p className="card-text">{listing.description}</p>
          <div className="d-flex justify-content-between">
            <span className="card-subtitle">{listing.zip}</span>
            <span className="card-subtitle">{listing.meeting_place}</span>
          </div>
        </div> 
          </div>*/}
    </div>
  );
}

export default Listing;
