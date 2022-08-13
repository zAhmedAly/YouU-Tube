import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";
import mongoose from "mongoose";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    user: req.user.id,
    ...req.body,
  });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "user",
      "_id img name"
    );
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    const videoList = await Promise.all(
      videos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    const videoList = await Promise.all(
      videos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const videoList = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId }).populate(
          "user",
          "_id img name"
        );
      })
    );

    res
      .status(200)
      .json(videoList.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    const videoList = await Promise.all(
      videos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    const videoList = await Promise.all(
      videos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};

export const channel = async (req, res, next) => {
  try {
    const videos = await Video.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    const videoList = await Promise.all(
      videos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};

export const history = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const watchHistoryVideos = user.watchHistory;
    console.log("watchHistoryVideos = ", watchHistoryVideos);
    const videoList = await Promise.all(
      watchHistoryVideos.map(async (videoId) => {
        return await Video.findById(videoId).populate("user", "_id img name");
      })
    );

    res.status(200).json(videoList.flat().reverse());
  } catch (err) {
    next(err);
  }
};

export const fix = async (req, res, next) => {
  console.log("inside fix");
  try {
    const videoList = await Video.updateMany({}, [
      { $unset: ["user"] },
      {
        $set: { user: { $toObjectId: "$userId" } },
      },
    ]);
    console.log("videoList = ", videoList);
    res.status(200).json(videoList);
  } catch (err) {
    next(err);
  }
};
