import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";
import EditListingForm from "./EditListingForm";
import ClaimsFooter from "./ClaimsFooter";
import RateHeader from "./RateHeader";

function Listing({
  listing,
  currentUser,
  handleEditListing,
  handleDeleteListing,
  requestListings,
}) {
  const [showPopover, setShowPopover] = useState(false);

  let selectedClaim = listing.claims.find((claim) => claim.selected);

  const user = listing.user;
  /* Bool stating whether or not this is your own listing */
  const mine = user.username === currentUser.username;
  /* Bool - Only give the option to rate if you're the listing poster or claimer */
  const rate = selectedClaim
    ? mine || selectedClaim.user.username == currentUser.username
    : false;
  /* Assigns who to rate based on your user role */
  const userToRate = rate ? (mine ? selectedClaim.user : user) : null;

  console.log(rate);

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
        {rate ? (
          <RateHeader
            userToRate={userToRate}
            requestListings={requestListings}
          />
        ) : null}
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
