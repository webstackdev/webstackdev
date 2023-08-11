/**
 * Sorts an array of objects, either from collection tags or global data
 * @param {number} a first param from sort
 * @param {number} b second param from sort
 * @returns mutated collection array
 */
const sortCollection = (a, b) => {
  if ('data' in a && 'data' in b) {
    return Math.sign(a.data.order - b.data.order)
  }
  return Math.sign(a.order - b.order)
}

const formatDate = (dateString) => {
  const dateObj = new Date(dateString)
  const month = dateObj.toLocaleString('en-US', { month: 'long' })
  const year = dateObj.getFullYear()
  return `${month}, ${year}`
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection('experienceSection', collectionApi => {
    return collectionApi.getFilteredByTag('experience').sort(sortCollection)
  })

  /**
   * Global data being added as collections
   */

  eleventyConfig.addCollection('cloudCollection', collectionApi => {
    return collectionApi.items[0].data.cloud.sort(sortCollection)
  })

  eleventyConfig.addCollection('databasesCollection', collectionApi => {
    return collectionApi.items[0].data.databases.sort(sortCollection)
  })

  eleventyConfig.addCollection('frameworksCollection', collectionApi => {
    return collectionApi.items[0].data.frameworks.sort(sortCollection)
  })

  eleventyConfig.addCollection('languageCollection', collectionApi => {
    return collectionApi.items[0].data.languages.sort(sortCollection)
  })

  eleventyConfig.addCollection('projectsCollection', collectionApi => {
    return collectionApi.items[0].data.projects.sort(sortCollection)
  })

  eleventyConfig.addCollection('skillsSection', collectionApi => {
    return collectionApi.items[0].data.skills.sort(sortCollection)
  })

  eleventyConfig.addCollection('toolsCollection', collectionApi => {
    return collectionApi.items[0].data.tools.sort(sortCollection)
  })

  eleventyConfig.addPassthroughCopy({ 'assets': 'images' })

  eleventyConfig.addFilter('getJobItemProp', experience => {
    return experience.data?.endDate ? 'alumniOf' : 'worksFor'
  })

  eleventyConfig.addFilter('startDateShortCode', date => {
    return formatDate(date)
  })

  eleventyConfig.addFilter('endDateShortCode', date => {
    return date ? formatDate(date) : 'Present'
  })

  eleventyConfig.addFilter('normalizeFilename', term => {
    return term.replace(/\s+/g, '').toLowerCase()
  })

  return {
    dir: {
      includes: '_partials',
      input: 'src',
      output: '.cache',
    },
  }
}
