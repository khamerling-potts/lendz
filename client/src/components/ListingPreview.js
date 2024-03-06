import { Card } from "react-bootstrap";

function ListingPreview({ listing, setSelectedListing }) {
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
