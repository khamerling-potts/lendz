import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";
import EditListingForm from "./EditListingForm";
import ClaimsFooter from "./ClaimsFooter";

function Listing({
  listing,
  currentUser,
  handleEditListing,
  handleDeleteListing,
}) {
  const [showPopover, setShowPopover] = useState(false);
  const user = listing.user;
  //Bool stating whether or not this is your own listing
  const mine = user.username === currentUser.username;

  function onDeleteListing() {
    fetch(`/listings/${listing.id}`, { method: "DELETE" }).then((r) =>
      handleDeleteListing(listing.id)
    );
  }

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

  const deletePopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">
        Are you sure you want to delete your listing?
      </Popover.Header>
      <Popover.Body>
        <Button onClick={onDeleteListing}>Delete Listing</Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="col">
      <Card className="h-100">
        <Card.Header>
          <small>{user.username}</small>
          {mine ? (
            <>
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
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={deletePopover}
              >
                <Button>Delete</Button>
              </OverlayTrigger>
            </>
          ) : null}
        </Card.Header>
        <Card.Body>
          <Card.Title>{listing.title}</Card.Title>
          <Card.Img src={listing.img_url} className="card-img img-fluid" />
          <Card.Text>{listing.description}</Card.Text>
          <div className="d-flex justify-content-between">
            <Card.Subtitle>{listing.zip}</Card.Subtitle>
            <Card.Subtitle className="card-subtitle">
              {listing.meeting_place}
            </Card.Subtitle>
          </div>
        </Card.Body>
        <ClaimsFooter
          listing={listing}
          currentUser={currentUser}
          mine={mine}
          handleEditListing={handleEditListing}
        />
      </Card>
    </div>
  );
}

export default Listing;
