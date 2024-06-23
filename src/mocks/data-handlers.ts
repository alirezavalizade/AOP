import { delay, http, HttpResponse } from "msw";
import { LibraryDetailsDto, LibraryDto } from "../api/types";

const data = [
  {
    id: 1,
    name: "React",
    author: "Meta",
    description: "A JavaScript library for building user interfaces",
    total_downloads: 5000000,
    downloads_last_seven_days: [80000, 75000, 82000, 78000, 79000, 65000, 60000],
    install_size: 3670016,
    last_publish_date: "2024-05-12T00:00:00Z",
    license: "MIT",
    latest_version: "18.0.0",
  },
  {
    id: 2,
    name: "Vue",
    author: "Evan You",
    description: "The Progressive JavaScript Framework",
    total_downloads: 3000000,
    downloads_last_seven_days: [50000, 48000, 52000, 51000, 53000, 42000, 41000],
    install_size: 2936012,
    last_publish_date: "2024-04-23T00:00:00Z",
    license: "MIT",
    latest_version: "3.3.0",
  },
  {
    id: 3,
    name: "Angular",
    author: "Google",
    description: "One framework. Mobile & desktop.",
    total_downloads: 4000000,
    downloads_last_seven_days: [70000, 68000, 73000, 71000, 72000, 59000, 58000],
    install_size: 5872025,
    last_publish_date: "2024-03-14T00:00:00Z",
    license: "MIT",
    latest_version: "14.2.3",
  },
  {
    id: 4,
    name: "jQuery",
    author: "John Resig",
    description: "Write less, do more.",
    total_downloads: 6000000,
    downloads_last_seven_days: [90000, 87000, 92000, 89000, 91000, 76000, 74000],
    install_size: 1258291,
    last_publish_date: "2024-06-01T00:00:00Z",
    license: "MIT",
    latest_version: "3.6.0",
  },
  {
    id: 5,
    name: "Lodash",
    author: "John-David Dalton",
    description: "A modern JavaScript utility library delivering modularity, performance & extras.",
    total_downloads: 4500000,
    downloads_last_seven_days: [68000, 65000, 70000, 67000, 69000, 57000, 55000],
    install_size: 2202009,
    last_publish_date: "2024-05-05T00:00:00Z",
    license: "MIT",
    latest_version: "4.17.21",
  },
  {
    id: 6,
    name: "D3",
    author: "Mike Bostock",
    description: "A JavaScript library for manipulating documents based on data.",
    total_downloads: 2000000,
    downloads_last_seven_days: [30000, 28000, 31000, 29000, 30000, 24000, 23000],
    install_size: 3145728,
    last_publish_date: "2024-02-18T00:00:00Z",
    license: "BSD-3-Clause",
    latest_version: "7.4.4",
  },
  {
    id: 7,
    name: "Moment",
    author: "Tim Wood",
    description: "Parse, validate, manipulate, and display dates in JavaScript.",
    total_downloads: 2500000,
    downloads_last_seven_days: [35000, 34000, 37000, 35000, 36000, 29000, 28000],
    install_size: 1572864,
    last_publish_date: "2024-01-10T00:00:00Z",
    license: "MIT",
    latest_version: "2.29.1",
  },
  {
    id: 8,
    name: "Axios",
    author: "Matt Zabriskie",
    description: "Promise based HTTP client for the browser and node.js.",
    total_downloads: 3500000,
    downloads_last_seven_days: [60000, 58000, 62000, 60000, 61000, 49000, 48000],
    install_size: 524288,
    last_publish_date: "2024-04-01T00:00:00Z",
    license: "MIT",
    latest_version: "1.3.2",
  },
  {
    id: 9,
    name: "Redux",
    author: "Dan Abramov",
    description: "Predictable state container for JavaScript apps.",
    total_downloads: 3000000,
    downloads_last_seven_days: [50000, 48000, 51000, 49000, 50000, 40000, 39000],
    install_size: 1048576,
    last_publish_date: "2024-05-30T00:00:00Z",
    license: "MIT",
    latest_version: "4.2.1",
  },
  {
    id: 10,
    name: "Next.js",
    author: "Guillermo Rauch",
    description: "The React Framework for Production.",
    total_downloads: 4000000,
    downloads_last_seven_days: [70000, 68000, 72000, 69000, 71000, 57000, 55000],
    install_size: 4194304,
    last_publish_date: "2024-06-10T00:00:00Z",
    license: "MIT",
    latest_version: "13.0.0",
  },
] satisfies LibraryDetailsDto[];

export const handlers = [
  http.get("/libraries", async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const filteredData = search ? data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) : data;

    return HttpResponse.json(
      filteredData.map(
        (item) =>
          ({
            id: item.id,
            name: item.name,
            total_downloads: item.total_downloads,
            install_size: item.install_size,
            latest_version: item.latest_version,
          }) satisfies LibraryDto,
      ),
    );
  }),

  http.get("/libraries/:id", async ({ params }) => {
    const libraryId = Number(params.id);

    await delay(400);

    const library = data.find((item) => item.id === libraryId);
    if (library === undefined) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    return HttpResponse.json(library);
  }),
];
