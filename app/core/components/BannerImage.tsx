import * as React from "react"
import { styled } from "@mui/system"

const ImageWrapper = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  overflow: "hidden",
})

const Image = styled("img")({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
})

interface BannerImageProps {
  alt: string | null
  src: string | null
}

const BannerImage = ({ alt, src }: BannerImageProps) => {
  return (
    <ImageWrapper>
      <Image
        alt={alt || ""}
        src={src || "https://aquajogclub.com/wp-content/uploads/2020/01/placeholder.png"}
      />
    </ImageWrapper>
  )
}

export default BannerImage
