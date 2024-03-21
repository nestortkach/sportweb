import React, { useState } from 'react'
import Image from 'next/future/image'

import Button from "../atoms/Button"

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const StackItem = (props) => {

  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(value => !value);

  const item = props.item.value.data

  return (
    <div className="experience__stack-item" onClick={() => toggleModal()}>
      <h3 className="experience__stack-item-title">{item.title}</h3>
      <Button 
        type="underlined" 
        color="yellow"
        icon={solid('chevron-right')}>
        View
      </Button>
      <div className={`modal ${modal ? 'open' : 'closed'}`}>
        <div class="modal__table">
          <div class="modal__cell" onClick={() => toggleModal()}>
            <div class="modal__card">
              <div class="modal__close" onClick={() => toggleModal()}></div>
              {item.image && (
              <div class="modal__card-image-wrap">
                <Image
                  className="modal__card-image"
                  src={item.image}
                  fill
                />
              </div>
              )}
              <div class="modal__card-content">
                <h2 className="modal__card-heading">{item.title}</h2>
                <div className="modal__card-description margin-fix" dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackItem