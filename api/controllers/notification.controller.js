// controllers/notificationController.js
import Notification from '../models/notification.model.js';

export const sendJoinRequest = async (req, res) => {
  const { recipientId, senderId, postId, message } = req.body;

  try {
    // Create a new notification
    const notification = new Notification({
      recipientId,
      senderId,
      postId,
      message
    });

    // Save the notification to the database
    await notification.save();

    res.status(200).json({ message: 'Join request sent successfully.' });
  } catch (error) {
    console.error('Error sending join request:', error);
    res.status(500).json({ message: 'Failed to send join request.' });
  }
};


export const getNotifications = async (req, res) => {
  const recipientId = req.user.id; // Get recipientId from authenticated user

  try {
    const notifications = await Notification.find({ recipientId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    res.status(500).json({ message: 'Failed to retrieve notifications.' });
  }
};