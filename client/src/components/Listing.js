import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";
import EditListingForm from "./EditListingForm";

function Listing({ listing, currentUser, handleEditListing }) {
  const [showPopover, setShowPopover] = useState(false);
  const user = listing.user;

  const editPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit your listing below</Popover.Header>
      <Popover.Body>
        <EditListingForm
          listing={listing}
          handleEditListing={handleEditListing}
          setShowPopover={setShowPopover}
        ></EditListingForm>
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
              show={showPopover}
              trigger="click"
              placement="right"
              overlay={editPopover}
            >
              <Button
                onClick={(e) => setShowPopover((showPopover) => !showPopover)}
              >
                Edit
              </Button>
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
    </div>
  );
}

export default Listing;
