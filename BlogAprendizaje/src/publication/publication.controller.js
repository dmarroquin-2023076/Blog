import Publication from "./publication.model.js"

export const savePublication = async(req, res) =>{
    const data = req.body
    try {
        const publication = new Publication(data)
        await publication.save()
        return res.send(
            {
                success:true,
                message: 'Publication saved successfully',
                publication
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {    
                success: false,
                message: 'General error when adding publication',
                err
            }
        )
    }
}

export const getAllPublication = async (req, res) => {
  const { course, sortBy = 'createdAt', order = 'desc' } = req.body

  const query = {}
  if (course) query.course = course
  
  const sortOptions = {}

  sortOptions[sortBy] = order === 'asc' ? 1 : -1

  try {
    
    const publications = await Publication.find(query)
      .sort(sortOptions)  
      .select('title course content createdAt')

    if (publications.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No publications found'
      })
    }

    return res.send({
      success: true,
      message: 'Publications found',
      total: publications.length,
      publications
    })
  } catch (err) {
    return res.status(500).send(
      {
        success: false,
        message: 'Error retrieving publications',
        err
      }
    )
  }
}


export const getPublicationsByCourse = async (req, res) => {
  const { course } = req.body

  try {
    const publications = await Publication.find({ course })
      .sort({ createdAt: -1 })
      .select('title content course createdAt')

    if (publications.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No publications found for the course '${course}'`
      })
    }

    return res.json({
      success: true,
      message: `Publications found for the course '${course}'`,
      publications
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Error filtering publications by course',
      err
    })
  }
}

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    const updated = await Publication.findByIdAndUpdate(id, data, { new: true })

    if (!updated) {
      return res.status(404).send({
        success: false,
        message: 'Publication not found'
      })
    }

    return res.send({
      success: true,
      message: 'Publication updated',
      publication: updated
    })
  } catch (e) {
    console.error('General error', e)
    return res.status(500).send({
      success: false,
      message: 'General error',
      e
    })
  }
}
 