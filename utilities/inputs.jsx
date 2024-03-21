export function getButtonProps() {

  return {
    name: 'buttons',
    type: 'list',
    subFields: [
      {
        name: 'link',
        type: 'object',
        defaultValue: {
          title: 'Button',
          url: '/',
          target: '_self',
        },
        subFields: [
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'url',
            type: 'url',
          },
          {
            name: 'target',
            type: 'string',
            enum: [
              {
                label: 'Same Window',
                value: '_self',
              },
              {
                label: 'New Window',
                value: '_blank',
              }
            ]
          }
        ]
      },
      {
        name: 'type',
        type: 'string',
        enum: [
          'filled',
          'underlined',
        ],
        defaultValue: 'filled',
      },
      {
        name: 'color',
        type: 'string',
        enum: [
          'white',
          'black',
          'yellow',
        ],
        defaultValue: 'black',
      },
    ]
  }
}

export function getSpacingProps() {

  return {
    name: 'spacing',
    type: 'object',
    subFields: [
      {
        name: 'top',
        type: 'string',
        enum: [
          'standard',
          'half',
          'none',
        ],
        defaultValue: 'standard',
      },
      {
        name: 'bottom',
        type: 'string',
        enum: [
          'standard',
          'half',
          'none',
        ],
        defaultValue: 'standard',
      },
    ]
  }
}