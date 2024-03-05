import { useState } from "react";
import { Popover, OverlayTrigger, Button, Card } from "react-bootstrap";
import EditListingForm from "./EditListingForm";
import ClaimsCard from "./ClaimsCard";
import RateHeader from "./RateHeader";
import Listing from "./Listing";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function ListingPreview({
  listing,
  setSelectedListing,
  //   currentUser,
  //   handleEditListing,
  //   handleDeleteListing,
  //   requestListings,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="col">
      <Card
        className="h-100 preview"
        onClick={(e) => setSelectedListing(listing)}
      >
        <Card.Img src={listing.img_url} className="card-img img-fluid" />
        <Card.Footer className="d-flex justify-content-between">
          <Card.Subtitle>{listing.title}</Card.Subtitle>
          <Card.Subtitle className="card-subtitle">{listing.zip}</Card.Subtitle>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ListingPreview;
