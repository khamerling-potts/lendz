import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";
import EditListingForm from "./EditListingForm";
import ClaimsCard from "./ClaimsCard";
import RateHeader from "./RateHeader";
import { useLocation, useOutletContext } from "react-router-dom";

function Listing({
  listing,
  setSelectedListing,
  currentUser,
  handleEditListing,
  handleDeleteListing,
  requestListings,
}) {
  // const {
  //   currentUser,
  //   handleEditListing,
  //   handleDeleteListing,
  //   requestListings,
  // } = useOutletContext();
  //const [listing, setListing] = useState(useLocation().state.listing);
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

  /* Calculating average user rating, rounding to 1 decimal */
  function calculateRating(user) {
    const ratings = user.ratings;
    const avgRating = ratings
      ? ratings.reduce((acc, current) => acc + current, 0) / ratings.length
      : null;
    const avgRatingRounded = avgRating ? Math.round(avgRating * 10) / 10 : null;
    return avgRatingRounded;
  }

  function onDeleteListing() {
    fetch(`/listings/${listing.id}`, { method: "DELETE" }).then((r) => {
      setSelectedListing(null);
      handleDeleteListing(listing.id);
    });
  }

  function handleGoBack() {
    console.log("going back");
    setSelectedListing(null);
  }

  const editPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Edit your listing below</Popover.Header>
      <Popover.Body>
        <EditListingForm
          listing={listing}
          setSelectedListing={setSelectedListing}
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
    // <div className="listing-div">

    <div className="row listing-row">
      <div className="listing-col col-md-6">
        <Card className="h-100 listing-card">
          <Card.Header>
            <span className="goback" onClick={handleGoBack}>
              <i class="fa-solid fa-left-long"></i>
            </span>

            {mine ? (
              <div className="edit-delete-div">
                <OverlayTrigger
                  show={showPopover}
                  trigger="click"
                  placement="right"
                  overlay={editPopover}
                >
                  <span
                    className="edit"
                    onClick={(e) =>
                      setShowPopover((showPopover) => !showPopover)
                    }
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={deletePopover}
                >
                  <span className="delete">
                    <i class="fa-regular fa-trash-can"></i>
                  </span>
                </OverlayTrigger>
              </div>
            ) : null}
          </Card.Header>
          <Card.Body>
            <span className="owner">
              <small>{user.username}</small>
              <span className="owner-rating badge">
                {calculateRating(user)} <i className="fa-solid fa-star"></i>
              </span>
            </span>
            <Card.Title>{listing.title}</Card.Title>
            <Card.Img src={listing.img_url} className="card-img" />
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
      <div className="claims-col col-md-6">
        {/* <Card.Body> */}
        <Card className="h-100">
          {rate ? (
            <RateHeader
              userToRate={userToRate}
              listingID={listing.id}
              setSelectedListing={setSelectedListing}
              requestListings={requestListings}
            />
          ) : null}
          <ClaimsCard
            listing={listing}
            setSelectedListing={setSelectedListing}
            currentUser={currentUser}
            mine={mine}
            handleEditListing={handleEditListing}
            calculateRating={calculateRating}
          >
            {rate ? (
              <RateHeader
                userToRate={userToRate}
                listingID={listing.id}
                setSelectedListing={setSelectedListing}
                requestListings={requestListings}
              />
            ) : null}
          </ClaimsCard>
          {/* </Card.Body> */}
        </Card>
      </div>
    </div>
    // </Card>
    // </div>
  );
}

export default Listing;
