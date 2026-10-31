import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../UI/Icon.jsx';

function SelectionField({
  options,
  value = '',
  selected,
  onChange,
  name,
  label,
  placeholder,
  optional = false,
}) {
  const inputId = useId();
  const listId = `${inputId}-options`;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const optionRefs = useRef([]);
  const multiple = Array.isArray(selected);

  const available = useMemo(() => {
    if (!multiple) return options;
    const selectedSet = new Set(selected);
    return options.filter((option) => !selectedSet.has(option));
  }, [multiple, options, selected]);

  const filtered = useMemo(() => {
    if (!query || (!multiple && query === value)) return available;
    const normalized = query.toLowerCase();
    return available.filter((option) => option.toLowerCase().includes(normalized));
  }, [available, multiple, query, value]);

  const currentIndex = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  useEffect(() => {
    optionRefs.current.length = filtered.length;
    if (isOpen && optionRefs.current[currentIndex]) {
      optionRefs.current[currentIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [currentIndex, filtered.length, isOpen]);

  const choose = useCallback(
    (option) => {
      if (multiple) onChange([...selected, option]);
      else onChange(option);
      setQuery('');
      setActiveIndex(0);
      setIsOpen(false);
    },
    [multiple, onChange, selected],
  );

  const open = useCallback(() => {
    if (!isOpen) {
      setQuery(multiple ? '' : value);
      setActiveIndex(0);
      setIsOpen(true);
    }
  }, [isOpen, multiple, value]);

  const close = useCallback(
    (event) => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      if (!multiple && isOpen) {
        const exact = options.find((option) => option.toLowerCase() === query.trim().toLowerCase());
        if (exact && exact !== value) onChange(exact);
      }
      setIsOpen(false);
      setQuery('');
    },
    [isOpen, multiple, onChange, options, query, value],
  );

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isOpen) open();
        else
          setActiveIndex((index) =>
            Math.max(
              0,
              Math.min(filtered.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)),
            ),
          );
      } else if (event.key === 'Enter' && isOpen) {
        event.preventDefault();
        if (filtered.length) choose(filtered[currentIndex]);
      } else if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        setQuery('');
      }
    },
    [choose, currentIndex, filtered, isOpen, open],
  );

  return (
    <div className="profile-field" onBlur={close}>
      <label htmlFor={inputId}>
        {label}
        {optional && <span className="profile-optional">Optional</span>}
      </label>
      <div className={`profile-select ${isOpen ? 'is-open' : ''}`}>
        <input
          id={inputId}
          name={name}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-activedescendant={
            isOpen && filtered.length ? `${listId}-${currentIndex}` : undefined
          }
          value={isOpen ? query : multiple ? '' : value}
          placeholder={placeholder}
          onFocus={open}
          onClick={open}
          onKeyDown={onKeyDown}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
        />
        <Icon name="chevronDown" className="profile-select-chevron" />
        {isOpen && (
          <ul id={listId} className="profile-options" role="listbox" aria-label={label}>
            {filtered.length ? (
              filtered.map((option, index) => (
                <li
                  id={`${listId}-${index}`}
                  key={option}
                  role="option"
                  aria-selected={!multiple && value === option}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  className={index === currentIndex ? 'is-highlighted' : ''}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option)}
                >
                  <span>{option}</span>
                  {!multiple && value === option && <Icon name="check" />}
                </li>
              ))
            ) : (
              <li className="profile-no-results" role="presentation">
                No matching options. Try another search.
              </li>
            )}
          </ul>
        )}
      </div>
      {multiple && selected.length > 0 && (
        <ul className="profile-selected" aria-label={`Selected ${label.toLowerCase()}`}>
          {selected.map((option) => (
            <li key={option}>
              <span>{option}</span>
              <button
                type="button"
                onClick={() => onChange(selected.filter((item) => item !== option))}
                aria-label={`Remove ${option}`}
              >
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(SelectionField);
