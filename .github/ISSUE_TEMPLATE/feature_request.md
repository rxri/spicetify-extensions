name: ✨ Feature Request
description: Request a new feature or enhancement
labels: [request]
body:
  - type: input
    id: extension
    attributes:
      label: 📦 Extension name
      description: Please provide the name of the extension you are having issues with.
      placeholder: ex. adblock
  - type: textarea
    id: description
    attributes:
      label: 📝 Provide a description of the new feature
      description: What is the expected behavior of the proposed feature? What is the scenario this would be used?
    validations:
      required: true

  - type: textarea
    id: additional-information
    attributes:
      label: ➕ Additional Information
      description: Give us some additional information on the feature request like proposed solutions, links, screenshots, etc.

  - type: markdown
    attributes:
      value: If you'd like to see this feature implemented, add a 👍 reaction to this post.