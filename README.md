# Next.js Mini Kanban Board

A modern, interactive Trello-style Kanban Board built with **Next.js**, **TypeScript**, and **Tailwind CSS** for the Next.js Internship Assignment.

![Kanban Board Preview](https://via.placeholder.com/800x400?text=Kanban+Board+Screenshot)

## ✨ Features

- Create new task cards with title and optional description
- Three columns: **Pending**, **In Progress**, and **Completed**
- Smooth **Drag & Drop** to move cards between columns
- Edit task title and description
- Delete tasks with confirmation dialog
- Fully responsive design (works on mobile & desktop)
- Tasks persist after page refresh using localStorage
- Clean and modern UI with hover effects and smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: `@hello-pangea/dnd`
- **Icons**: Lucide React

## 📋 Requirements Fulfilled

- ✅ Create Card (Title + Description)
- ✅ View Board with three columns
- ✅ Move Cards (Drag & Drop between columns)
- ✅ Edit Card
- ✅ Delete Card with confirmation
- ✅ Clean code structure and proper state management
- ✅ Responsive UI
- ✅ Proper use of Client Components

## 🎯 Bonus Features Implemented

- Smooth and responsive Drag & Drop experience
- Optimistic UI updates (instant status change on drag)
- Persistent storage with localStorage
- Confirmation dialog before deleting tasks
- Hover effects and dragging animations
- Empty column support
- Clean, maintainable, and well-structured code

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ramyoz-internship/nextjs-kanban-board.git
   cd nextjs-kanban-board```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
