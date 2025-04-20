# Doctor Booking UI

A responsive, accessible appointment booking UI built with React & TailwindCSS.

## Tech Stack

- React + TypeScript
- TailwindCSS
- Zustand (state management)
- Mock data (no backend)

## Features

- Doctor Directory View with filters (specialty, availability)
- Booking Modal with time slots
- My Appointments Summary View Modal
- Fully responsive
- Accessible via keyboard
- Uses `aria-*`, roles, and Lighthouse-passed accessibility

## How AI Tools Were Used

- ChatGPT: Helped scaffold components, optimize accessibility, and generate mock data.

## Known Limitations

- Time slots are mocked and not dynamically generated per doctor or day
- Minimal test coverage; only basic UI behavior is verified
- No animations or transitions for modal open/close
- Didn’t add all the units tests due to time constraints.
- No form validation in the booking flow

## Next Steps

- Add support for dynamic time slots based on doctor's real schedule
- Expand unit test coverage using React Testing Library
- Implement pagination or infinite scroll for long doctor lists
- Add animated transitions for modals and UI components
- Support rescheduling of appointments
- use react-helmet to optimize SEO

## 🚀 Getting Started

```bash
git clone https://github.com/bassel-ahmed-007/doctor-booking-ui.git
cd doctor-booking-ui
npm install
npm run dev
```

## link for the video BasselAhmed_presentation

[https://drive.google.com/file/d/1N2wUbFrnJIuyXiyTMwC35MGYu4s3seN\_/view?usp=sharing](https://drive.google.com/file/d/1N2wUbFrnJIuyXiyTMwC35MGYu4s3seN_/view?usp=sharing)

## vercel deployment link

[https://dbooking.netlify.app/](https://dbooking.netlify.app/)
