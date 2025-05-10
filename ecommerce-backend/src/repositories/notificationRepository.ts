import AppDataSource from '../ormconfig';
import { Notifications } from '../entities/Notifications';

export const notificationsRepository = AppDataSource.getRepository(
  Notifications
).extend({
  async createNotification(data: any) {
    const newNotification = this.create(data);
    await this.save(newNotification);

    return newNotification;
  },
});
