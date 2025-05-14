import Comment from './comment.model.js'

export const saveComment = async (req, res) => {
  const data = req.body

  try {
    const comment = new Comment(data)
    await comment.save()

    return res.send({
      success: true,
      message: 'Comment saved successfully',
      comment
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General error when saving comment',
      err
    })
  }
}

export const getCommentsByPublication = async (req, res) => {
  const { publicationId } = req.body

  try {
    const comments = await Comment.find({ publicationId })
      .populate({
        path: 'publicationId',
        select: 'title content createdAt'
      })
      .sort({ createdAt: -1 })
      .limit(10) 
      .skip(0)   
      .select('userName content createdAt')

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No comments found for this publication'
      })
    }

    return res.json({
      success: true,
      message: 'Comments found',
      total: comments.length,
      comments
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Error retrieving comments',
      err
    })
  }
}