// BreadcrumbComponent.jsx
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BreadCrumb.css'; // Import your custom CSS for the breadcrumb

const BreadcrumbComponent = ({ items }) => {
    return (
        <div>
            <Breadcrumb>
                {items.map((item, index) => (
                    <Breadcrumb.Item
                        key={index}
                        linkAs={Link}
                        linkProps={{ to: item.path }}
                        active={item.active}
                    >
                        {item.label}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            {/* Line Separator */}
            <div className="line-separator" />
        </div>
    );
};

export default BreadcrumbComponent;
