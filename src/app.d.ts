// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  interface Post {
    title: string;
    date: string;
    asset_path: string;
    tags: string[];
  }
  interface ProjectData {
    title: string;
    description: string;

    href: string | null;
    github: string | null;

    image: string;

    accent: string;
    onAccent: string;
    onSurface: string;
  }
}

export {};
