CREATE TABLE government_entities
(
	id INTEGER PRIMARY KEY, -- generated id
	external_id TEXT, -- ID given to the organization by the parent organization.
	-- GoC Ministries are normalized as can-minc-<id>
	-- GoC Departments are normalized as can-minc-<id>-dep-<id>
    name TEXT, -- The name of the organization spending money
    city TEXT, -- City where the head office is located (where key executives work)
    province TEXT, -- Province where the head office is located (where key executives work)
	country TEXT, -- Country where the head office is located (where key executives work)
    url TEXT, -- Official Website
    description TEXT, -- Blurb of what the organization is responsible for.
    parent_id INTEGER, -- Parent organization if any, ministry, order of government, etc.

    FOREIGN KEY (parent_id) REFERENCES government_entities (id)
);


CREATE TABLE recipients
(
	id INTEGER PRIMARY KEY, -- generated id
	external_id TEXT, -- ID given to the organization by an order of government
	name TEXT, -- The name of the organization spending money
    url TEXT,
    description TEXT,

    city TEXT, -- City where the head office is located (where key executives work)
    province TEXT, -- Province where the head office is located (where key executives work)
	country TEXT -- Country where the head office is located (where key executives work)
);

CREATE TABLE payments
(
    id INTEGER PRIMARY KEY, -- generated id,
    program_id INTEGER, -- program authorizing payment
    recipient_id INTEGER, -- recipient who was paid under the
    amount INTEGER,
    currency TEXT,
    url TEXT,
    description TEXT,
    fiscal_year TEXT,
--  TODO: payment year
--  TODO: is_aggregate, flag to mark it as an aggregate of smaller payments



FOREIGN KEY (program_id) REFERENCES programs(id), -- references payer
FOREIGN KEY (recipient_id) REFERENCES recipients(id) -- references payer

);

-- TODO: How should financial years be modeled here? is this reasonable to store them as an array?
CREATE TABLE programs
(
    id INTEGER PRIMARY KEY, -- generated id,
    government_entity_id INTEGER, -- payer responsible for disbursing money under the program
	name TEXT, -- The name of the organization spending money
    description TEXT,
    fiscal_years TEXT [], -- Array of financial years associated with the program
--     TODO: Implement this
    program_spending JSON, -- Hash of total amounts spent in each fiscal year: e.g. { "2023/2024": 1000000 }


    FOREIGN KEY (government_entity_id) REFERENCES government_entities(id) -- references payer
);

CREATE TABLE sources
(
    id INTEGER PRIMARY KEY, -- generated id,
    canonical_url TEXT, -- URL where this data was found
    cached_url TEXT, -- URL to our copy of the data
    name TEXT,
    description TEXT,
    filetype TEXT
);

CREATE TABLE source_usages
(
    id INTEGER PRIMARY KEY, -- generated id,
    table_name
    canonical_url TEXT, -- URL where this data was found
    cached_url TEXT, -- URL to our copy of the data
    name TEXT,
    description TEXT,
    filetype TEXT
)