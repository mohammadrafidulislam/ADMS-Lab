# RentFair BD — Is your rent fair?

> Full Stack Rent Comparison System for Bangladesh

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org) [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev) [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org) [![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com) [![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb)](https://mongodb.com) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

## Project Overview

RentFair BD helps renters in Bangladesh determine if their rent is fair based on local area averages. Enter property details and get instant feedback: Underpriced, Fair, or Overpriced.

**Features:** Rent Comparison | Fair Range Calculation | Area-Based Pricing (Dhanmondi, Gulshan, Uttara, Banani, Mohammadpur) | Admin Panel

## System Architecture

React + Vite (Frontend) → REST API → Node.js + Express (Backend) → MongoDB Atlas

## Algorithm

Area Average = SUM(all rents) / COUNT(properties) | Standard Deviation = √(Σ(rent - avg)² / n) | Fair Range Low = Average - (0.5 × Std Dev) | Fair Range High = Average + (0.5 × Std Dev) | Status: Underpriced (Rent < Low), Fair (Low ≤ Rent ≤ High), Overpriced (Rent > High)

**Example (Dhanmondi):** Area Average: ৳70,000 | Fair Range: ৳68,100 - ৳71,900 | User Rent: ৳60,000 → Underpriced 

## Database Schema (MongoDB)

Location: { name, city, averageRent, fairRangeLow, fairRangeHigh, sampleSize } | Property: { location, monthlyRent, sizeSqft, rooms, bathrooms, floor, hasLift, hasParking } | Comparison: { propertyId, userRent, fairRangeLow, fairRangeHigh, areaAverage, status } | User: { email, name, role, savedSearches }

## API Routes

GET /api/locations - Get all locations | POST /api/compare - Compare rent vs area average | POST /api/admin/locations - Add location (admin) | PUT /api/admin/locations/:id - Update averages (admin)

## Tech Stack

Frontend: React + Vite + Tailwind | Backend: Node.js + Express | Database: MongoDB + Mongoose | Charts: Recharts | Deployment: Vercel (FE) + Render (BE)

## Installation

```bash
git clone https://github.com/mohammadrafidul/rentfair-bd.git
cd rentfair-bd
cd backend && npm install
npm run dev
cd frontend && npm install
npm run dev
