# Project Repository Platform

This is the web frontend for the Project Repository Platform, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern and responsive UI
- Role-based access control
- Project management
- Team collaboration
- Task tracking
- Repository integration
- Real-time notifications

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NahomAnteneh/prp.git
cd prp/web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm start
# or
yarn start
```

## Docker Support

### Building the Docker Image

```bash
docker build -t prp-web .
```

### Running the Docker Container

```bash
docker run -p 3000:3000 prp-web
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
