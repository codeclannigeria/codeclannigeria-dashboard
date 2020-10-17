import './SkillTags.css';

import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';

interface Props {
  technologies: string[];
  onTechsSet: (technologies: string[]) => void;
}

const SkillTags = ({ technologies, onTechsSet: setTechnologies }: Props) => {
  const [autoFocus, setAutoFocus] = useState({ input: false, editInput: false });

  const [skillsTags, setSkillsTags] = useState({
    tags: technologies,
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  });

  const handleClose = (removedTag: string) => {
    const tags = skillsTags.tags.filter((tag) => tag !== removedTag);
    setSkillsTags({ ...skillsTags, tags });
  };

  const handleEditInputConfirm = () => {
    const skills = ({
      tags,
      editInputIndex,
      editInputValue,
    }: {
      tags: any;
      editInputIndex: any;
      editInputValue: any;
    }): {
      tags: any[];
      editInputIndex: number;
      editInputValue: string;
      inputVisible: boolean;
      inputValue: string;
    } => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      return {
        ...skillsTags,
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    };
    setSkillsTags(skills);
  };
  const handleInputChange = (e: any) => {
    setSkillsTags({ ...skillsTags, inputValue: e.target.value });
  };
  const handleInputConfirm = () => {
    const { inputValue } = skillsTags;
    let { tags } = skillsTags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    setSkillsTags({
      ...skillsTags,
      tags,
      inputVisible: false,
      inputValue: '',
    });
    setAutoFocus({ editInput: false, input: false });
    setTechnologies(tags);
  };
  const handleEditInputChange = (e: any) => {
    setSkillsTags({ ...skillsTags, editInputValue: e.target.value });
  };

  const renderTags = () => {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = skillsTags;
    const showInput = () => {
      setAutoFocus({ ...autoFocus, input: true });
      setSkillsTags({ ...skillsTags, inputVisible: true });
    };
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                autoFocus={autoFocus.editInput}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              onClose={() => handleClose(tag)}
              color="blue"
              closable
            >
              <span
                onDoubleClick={(e) => {
                  setAutoFocus({ ...autoFocus, editInput: true });
                  setSkillsTags({ ...skillsTags, editInputIndex: index, editInputValue: tag });
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            autoFocus={autoFocus.input}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={showInput}>
            <PlusOutlined /> Add Skill
          </Tag>
        )}
      </>
    );
  };
  return renderTags();
};

export default SkillTags;
