import React, { useEffect, useRef, useState } from 'react'
import { MdCheck, MdChevronRight, MdCircle } from 'react-icons/md'

export default function ContextMenu({ options, position, onClose }) {
  const menuRef = useRef(null)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose?.()
      }
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  useEffect(() => {
    if (!menuRef.current || !position) return

    const menu = menuRef.current
    const rect = menu.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x = position.x
    let y = position.y

    if (x + rect.width > viewportWidth) {
      x = viewportWidth - rect.width - 8
    }

    if (y + rect.height > viewportHeight) {
      y = viewportHeight - rect.height - 8
    }

    if (x < 0) x = 8
    if (y < 0) y = 8

    menu.style.left = `${x}px`
    menu.style.top = `${y}px`
  }, [position])

  const processedOptions = processMenuItems(options || [])

  const handleItemClick = (item, e) => {
    if (item.type === 'separator' || !item.enabled) return
    if (item.type === 'submenu' || item.submenu) return

    if (item.type === 'checkbox') {
      item.checked = !item.checked;
      item.onClick?.(e, !item.checked)
    } else if (item.type === 'radio') {
      item.onClick?.(e)
    } else {
      item.onClick?.(e)
    }

    if (item.type !== 'checkbox' && item.type !== 'radio') {
      onClose?.()
    }
  }

  const handleMouseEnter = (item, index, e) => {
    if ((item.type === 'submenu' || item.submenu) && item.enabled !== false) {
      const itemRect = e.currentTarget.getBoundingClientRect()
      setActiveSubmenu(index)
      setSubmenuPosition({
        x: itemRect.right - 4,
        y: itemRect.top
      })
    } else {
      setActiveSubmenu(null)
    }
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  if (!position) return null

  return (
    <div 
      ref={menuRef} 
      className="context-menu"
      onMouseLeave={handleMouseLeave}
    >
      {processedOptions.map((item, index) => (
        <MenuItem 
          key={item.id || index}
          item={item}
          index={index}
          onClick={handleItemClick}
          onMouseEnter={handleMouseEnter}
          isActive={activeSubmenu === index}
          submenuPosition={submenuPosition}
          onCloseAll={onClose}
        />
      ))}
    </div>
  )
}

function MenuItem({ item, index, onClick, onMouseEnter, isActive, submenuPosition, onCloseAll }) {
  if (item.visible === false) return null

  if (item.type === 'separator') {
    return <div className="context-menu-separator" />
  }

  const isDisabled = item.enabled === false
  const hasSubmenu = item.type === 'submenu' || item.submenu

  const isCheckboxOrRadio = item.type === 'checkbox' || item.type === 'radio'

  const itemClassName = `context-menu-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`

  return (
    <>
      <div 
        className={itemClassName}
        onClick={(e) => onClick(item, e)}
        onMouseEnter={(e) => onMouseEnter(item, index, e)}
      >
        <div className="context-menu-item-icon-or-check">
          {isCheckboxOrRadio ? (
            <>
              {item.type === 'checkbox' && item.checked && <MdCheck size={14} />}
              {item.type === 'radio' && item.checked && <MdCircle size={8} />}
            </>
          ) : (
            item.icon && (
              typeof item.icon === 'string' ? (
                <img src={item.icon} alt="" />
              ) : (
                item.icon
              )
            )
          )}
        </div>
        <div className="context-menu-item-label">
          {item.label}
        </div>

        {item.accelerator && (
          <div className="context-menu-item-accelerator">
            {item.accelerator}
          </div>
        )}

        {hasSubmenu && (
          <div className="context-menu-item-submenu-arrow">
            <MdChevronRight size={16} />
          </div>
        )}
      </div>

      {hasSubmenu && isActive && (
        <ContextMenu 
          options={item.submenu}
          position={submenuPosition}
          onClose={onCloseAll}
        />
      )}
    </>
  )
}

function processMenuItems(items) {
  const itemsMap = new Map()
  const result = []

  items.forEach(item => {
    if (item.id) {
      itemsMap.set(item.id, item)
    }
  })

  const inserted = new Set()

  const insertItem = (item) => {
    if (item.id && inserted.has(item.id)) return
    
    if (item.before && item.before.length > 0) {
      const beforeId = item.before[0]
      const beforeIndex = result.findIndex(i => i.id === beforeId)
      if (beforeIndex !== -1) {
        result.splice(beforeIndex, 0, item)
        if (item.id) inserted.add(item.id)
        return
      }
    }

    if (item.after && item.after.length > 0) {
      const afterId = item.after[0]
      const afterIndex = result.findIndex(i => i.id === afterId)
      if (afterIndex !== -1) {
        result.splice(afterIndex + 1, 0, item)
        if (item.id) inserted.add(item.id)
        return
      }
    }

    result.push(item)
    if (item.id) inserted.add(item.id)
  }

  items.forEach(item => {
    const processedItem = {
      enabled: true,
      visible: true,
      ...item
    }
    insertItem(processedItem)
  })

  return result
}
