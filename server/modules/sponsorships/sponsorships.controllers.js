import executeQuery from '../../config/db.js';

class SponsorshipController {
  getSponsorshipsTypes = async (req, res) => {
    try {
      const sponsorships = await executeQuery('SELECT * FROM sponsorship_type');
      res.status(200).json(sponsorships);
    } catch (error) {
      console.error('Error en getSponsorshipsTypes:', error);
      res
        .status(500)
        .json({ error: 'Error al obtener los tipos de patrocinios' });
    }
  };

  getSponsorshipType = async (req, res) => {
    const { id } = req.params;
    try {
      const sponsorship = await executeQuery(
        'SELECT * FROM sponsorship_type WHERE sponsorship_type_id = ?',
        [id]
      );
      res.status(200).json(sponsorship);
    } catch (error) {
      console.error('Error en getSponsorshipType:', error);
      res.status(500).json({ error: 'Error al obtener el tipo de patrocinio' });
    }
  };

  getSponsorshipBenefits = async (req, res) => {
    const { id } = req.params;

    try {
      const benefits = await executeQuery(
        'SELECT * FROM sponsorship_benefit WHERE sponsorship_type_id = ?',
        [id]
      );
      res.status(200).json(benefits);
    } catch (error) {
      console.error('Error en getSponsorshipBenefits:', error);
      res
        .status(500)
        .json({ error: 'Error al obtener los beneficios de patrocinios' });
    }
  };

  createSponsorship = async (req, res) => {
    // inputs: user_id (req), beehive_id (aleatorio de los existentes), sponsorship_type_id (body)
    const { user_id } = req;
    const { sponsorship_type_id } = req.body;

    try {
      const max_beehive_id = await executeQuery(
        'SELECT MAX(beehive_id) FROM beehive'
      );
      const beehive_id =
        Math.floor(Math.random() * max_beehive_id[0]['MAX(beehive_id)']) + 1;

      await executeQuery(
        'INSERT INTO sponsorship (user_id, beehive_id, sponsorship_type_id) VALUES (?, ?, ?)',
        [user_id, beehive_id, sponsorship_type_id]
      );

      res.status(201).json({
        message: 'Patrocinio creado correctamente',
        data: {
          beehive_id,
        },
      });
    } catch (error) {
      console.error('Error en createSponsorship:', error);
      res.status(500).json({ error: 'Error al crear el patrocinio' });
    }
  };

  getAllSponsorships = async (req, res) => {
    try {
      const sponsorships = await executeQuery(
        'SELECT s.sponsorship_id, u.name AS user_name, b.name AS beehive_name, st.title AS sponsorship_type, s.is_deleted, s.start_date FROM sponsorship s JOIN user u ON s.user_id = u.user_id JOIN beehive b ON s.beehive_id = b.beehive_id JOIN sponsorship_type st ON s.sponsorship_type_id = st.sponsorship_type_id ORDER BY s.sponsorship_id DESC'
      );
      res.status(200).json(sponsorships);
    } catch (error) {
      console.error('Error en getAllSponsorships:', error);
      res
        .status(500)
        .json({ error: 'Error al obtener los patrocinios registrados' });
    }
  };
}

export default new SponsorshipController();
