const {Incident, User} = require('../../db/models')

module.exports = {
  Query: {
    incidents: () => {
      return Incident.find().exec();
    }
  },
  Incident: {
    assignee: async (incident, args, context, info) => {
      await incident.populate('assignee').execPopulate()
      return incident.assignee;
    },
    watch: async (incident, args, context, info) => {
      await incident.populate('watch').execPopulate()
      return incident.watch;
    }
  },
  Mutation: {
    /**
     * @see https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
     */
    createIncident: (parent, args, context, info) => {
      const {name, description, priority} = args.incident;
      return Incident.create({
        name, description, priority
      });
    },

    updateIncidentStatus: (parent, args, context, info) => {
      const {id, status} = args;
      // findOneAndModify
      return Incident.findByIdAndUpdate(id, {status}, {new: true}).populate('assignee').populate('watch').exec();
    },

    assignIncident: async (parent, args, context, info) => {
      const {id, userId} = args;
      // todo check if user exists
      const assignee = await User.findById(userId);
      return Incident.findByIdAndUpdate(id, {assignee}, {new: true}).exec();
    },

    watchIncident: async (parent, args, context, info) => {
      const {id, userId} = args;
      // todo check if user exists
      const watch = await User.findById(userId);
      return Incident.findByIdAndUpdate(id, {$push: {watch}}, {new: true}).exec();
    }
  }
}
