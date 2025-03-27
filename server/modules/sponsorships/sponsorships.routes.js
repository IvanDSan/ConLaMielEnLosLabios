import express from 'express';
import SponsorshipsController from './sponsorships.controllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

const router = express.Router();

router.get('/types', SponsorshipsController.getSponsorshipsTypes);
router.get('/types/:id', SponsorshipsController.getSponsorshipType);
router.get('/benefits/:id', SponsorshipsController.getSponsorshipBenefits);
router.post(
  '/create',
  verifyToken('user'),
  SponsorshipsController.createSponsorship
);
router.get(
  '/get',
  verifyToken('admin'),
  SponsorshipsController.getAllSponsorships
);
router.get(
  '/getByUserId',
  verifyToken('user'),
  SponsorshipsController.getSponsorshipByUserId
);
router.put(
  '/cancel/:sponsorship_id',
  verifyToken('user'),
  SponsorshipsController.cancelSponsorship
);

export default router;
