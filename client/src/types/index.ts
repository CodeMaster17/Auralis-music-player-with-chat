export interface Song {
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

/*
[
{
"_id" : "1",
"title" : "Album title",
"artist" : "Album Artist",
"imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7b4c1b7a5f8f8d9f8f5b7b3",
"releaseYear" : 2004,
"songs": [
{
	"_id": "61f2e4d9b3d6a1c6c0b5d6c9",
	"title": "The Way You Look Tonight",
	"artist": "Frank Sinatra",
	"albumId": "61f2e4d9b3d6a1c6c0b5d6c8",
	"imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7b4c1b7a5f8f8d9f8f5b7b3",
	"audioUrl": "https://res.cloudinary.com/d
}
]
}
]
*/

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
}
