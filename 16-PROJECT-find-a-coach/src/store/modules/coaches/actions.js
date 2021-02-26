import axios from 'axios';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const databaseUrl = context.rootGetters.databaseUrl;

    try {
      await axios.put(`${databaseUrl}/coaches/${userId}.json`, coachData);

      context.commit('registerCoach', {
        ...coachData,
        id: userId
      });

    } catch (error) {
      console.log(error);
    }
  },
  async loadCoaches(context) {
    const databaseUrl = context.rootGetters.databaseUrl;

    try {
      const { data: coachesData } = await axios.get(
        `${databaseUrl}/coaches.jso`
      );

      const coaches = [];
      for (const key in coachesData) {
        const coach = {
          id: key,
          firstName: coachesData[key].firstName,
          lastName: coachesData[key].lastName,
          description: coachesData[key].description,
          hourlyRate: coachesData[key].hourlyRate,
          areas: coachesData[key].areas
        };
        coaches.push(coach);

        context.commit('setCoaches', coaches);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
