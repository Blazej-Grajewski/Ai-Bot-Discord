// src/handlers/roleChecker.js

function hasRole(interaction, roleName) {
  // must be in a server (not DM)
  if (!interaction.member || !interaction.member.roles) {
    return false;
  }
  return interaction.member.roles.cache.some(role => role.name === roleName);
}

module.exports = { hasRole };