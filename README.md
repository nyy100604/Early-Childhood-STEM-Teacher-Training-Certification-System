# Early Childhood STEM Education Teacher Certification System

Welcome to the repository for the Early Childhood STEM Education Teacher Certification System! This project leverages blockchain technology to verify and manage certificates for early childhood STEM education teachers, ensuring authenticity and reliability.

## Purpose

Our platform aims to provide a secure, transparent, and efficient certificate management system. By utilizing blockchain, we enhance the quality of early childhood STEM education, enabling educational institutions, teachers, and parents to trust these certificates. The system ensures that every certificate is genuine, reducing fraud and promoting higher standards in education.

## Features

- **Blockchain Verification**: Each certificate is stored on the blockchain, ensuring immutability and transparency.
- **Efficient Management**: Easy management of certificates for both issuing institutions and teachers.
- **User-Friendly Interface**: Intuitive interface for browsing, querying, creating, and uploading certificates.
- **Security**: Robust security measures to protect personal and certificate information.

## Getting Started

To start using or developing this project, follow the steps below.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/nyy100604/early-childhood-stem-certification.git
cd early-childhood-stem-certification
npm install
# or
yarn install

```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to see the application

### Project routes:

Common Routes

- **/404**
  Displays a user-friendly message when a page is not found.

- **/unAuthorized**
  Informs users they do not have permission to access the requested resource.

- **/login**
  Allows users to log in to the system.

- **/signup**
  Allows new users to create an account.

- **/certificate-lookup**
  Enables users to search and verify certificates.

Teacher Routes

- **/profile-manage**
  Allows teachers to view and edit their profile information.

- **/profile-setup**
  Guides teachers through the initial setup of their profile.
  Issuing Institution Routes

- **/certificate-create**
  Provides a form for issuing institutions to create new certificates.

- **/certificate-manage**
  Allows issuing institutions to view, edit, and manage all issued certificates.

- **/certificate-upload/select**
  Facilitates the uploading of certificate documents.

- **/certificate/[certificate]**
  Displays detailed information about a specific certificate.
