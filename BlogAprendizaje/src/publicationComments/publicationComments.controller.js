import Publication from '../publication/publication.model.js'
import Comment from '../comment/comment.model.js'

export const getPublicationWithComments = async (req, res) => {
  const { id } = req.params

  try {
    const publication = await Publication.findById(id)
      .select('title content course createdAt')

    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication not found'
      })
    }

    const comments = await Comment.find({ publicationId: id })
      .sort({ createdAt: -1 })
      .select('userName content createdAt')

    return res.json({
      success: true,
      message: 'Publication and its comments retrieved successfully',
      publication,
      comments
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Error retrieving publication with comments',
      err
    })
  }
}