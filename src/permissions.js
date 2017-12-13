let config = require('./config').bot

let isBotAdminOfGuild = (usr, guild) => {

    let adminRoles = config.adminRoles

    roleMembers =  guild.roles
        .filter(role => adminRoles.indexOf(role.name) > -1)
        .map(role => role.members)
        
    // :thinking: 
    if (roleMembers.length > 0) {
        return !!roleMembers[0].get(usr.id)
    }

    return false
}

module.exports.isBotAdminOfGuild = isBotAdminOfGuild