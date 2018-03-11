export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export interface Movie {
  id: string;
  info: {
    actors: string[];
    directors: string[];
    genres: string[];
    image_url: string;
    plot: string;
    rank: number;
    rating: number;
    releaseDate: string;
    running_time_secs: number;
  };
  year: number;
  title: string;
}

export function generateMockBook(): Book {
  return {
    id: '1',
    volumeInfo: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['author'],
      publisher: 'publisher',
      publishDate: '',
      description: 'description',
      averageRating: 3,
      ratingsCount: 5,
      imageLinks: {
        thumbnail: 'string',
        smallThumbnail: 'string',
      },
    },
  };
}
