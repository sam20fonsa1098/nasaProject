import { Schema, model } from 'mongoose';

const planetsSchema = new Schema({
  koi_disposition: {
    type: String,
    required: true,
  },
  koi_insol: {
    type: Number,
    required: true,
  },
  koi_prad: {
    type: Number,
    required: true,
  },
  kepler_name: {
    type: String,
    required: true,
  },
});

const planetModel = model('Planet', planetsSchema);

export { planetsSchema, planetModel };
