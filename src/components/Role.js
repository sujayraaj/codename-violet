import React from 'react';

const Role = ({title,
                type,
                summary,
                description,
                theme}) => {
        return (
            <div className={theme.role}>
                <h5 className={theme.roleTitle}>{title +' - '+type}</h5>
                  <p className={theme.roleSummary}>{summary}</p>
                <ul className={theme.roleDescriptionList}>
                    {
                        description.map(val=><li className={theme.roleDescriptionListItem}>{val}</li>)
                    }
                </ul>
            </div>
        );            
}

export default Role;
