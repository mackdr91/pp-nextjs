"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/property/${property._id}`;
  return (
    <>
      <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
        Share Property
      </h3>
      <div className="flex gap-4 md:flex-row justify-center">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type.replace(/\s+/g, "")}ForRent`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={["ForRent", `${property.type.replace(/\s+/g, "")}`]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this ${property.type} for rent at ${property.name}. ${shareUrl}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
          body={`Check out this ${property.type} for rent at ${property.name}. ${shareUrl}`}

        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

      </div>
    </>
  );
};

export default ShareButtons;
