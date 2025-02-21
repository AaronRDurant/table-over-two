export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  published_at: string;
  html: string;
  primary_author?: {
    name: string;
    profile_image?: string;
  };
  tags?: Tag[];
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  visibility: "public" | "internal";
};

export type OGImageDescriptor = {
  url: string | URL;
  alt?: string;
  width?: number;
  height?: number;
  type?: string;
};

export type TwitterImageDescriptor = {
  url: string | URL;
  alt?: string;
};
