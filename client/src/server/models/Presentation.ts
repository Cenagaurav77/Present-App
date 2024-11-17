import mongoose from 'mongoose'
import { TPage } from '@/shared/types'

export interface TPresentation extends mongoose.Document {
  user_uid: string
  name: string
  pages: TPage[]
}

const PresentationSchema = new mongoose.Schema<TPresentation>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this presentation'],
    maxlength: [60, 'Presentation name cannot be more than 60 characters'],
  },
  user_uid: {
    type: String,
    required: [true, "Please provide user's uid"],
  },
  pages: {
    type: [],
    required: [true, 'Please provide pages'],
  },
})

export default mongoose.models.Presentations ||
  mongoose.model<TPresentation>('Presentations', PresentationSchema)
