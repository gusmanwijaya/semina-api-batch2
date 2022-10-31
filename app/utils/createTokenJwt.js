module.exports = {
  createTokenUser: (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    organizer_id: user.organizer_id,
  }),
  createTokenParticipant: (participant) => ({
    id: participant.id,
    firstName: participant.firstName,
    lastName: participant.lastName,
    email: participant.email,
  }),
};
