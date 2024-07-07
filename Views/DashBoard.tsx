
import Avatar from '@atlaskit/avatar';
import Heading from '@atlaskit/heading';
import BitbucketPullrequestsIcon from '@atlaskit/icon/glyph/bitbucket/pullrequests';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { AtlassianIcon } from '@atlaskit/logo';
import Lozenge from '@atlaskit/lozenge';
import { Box, Inline, Stack, Text, xcss } from '@atlaskit/primitives';
import Button, { ButtonGroup } from '@atlaskit/button'
import Calendar from '@atlaskit/calendar';
import DynamicTable from '@atlaskit/dynamic-table';

const containerStyles = xcss({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'elevation.surface.raised',
    padding: 'space.150',
    transition: '200ms',
    borderRadius: 'border.radius.100',
    boxShadow: 'elevation.shadow.raised',
    ':hover': {
        backgroundColor: 'elevation.surface.hovered',
    },
});

const inlineStyles = xcss({
    display: 'flex',
    alignItems: 'center',
});

const extraInfoStyles = xcss({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlock: 'space.050',
});

function Example() {
    return (
        <Stack xcss={containerStyles} space="space.100">
            <Text as="span">
                Dropdown menu items in Modal are not accessible to keyboard/screen readers in Safari
            </Text>
            <Box as="span">
                <Lozenge appearance="new">Accelerate Cloud Accessibility</Lozenge>
            </Box>
            <Box xcss={extraInfoStyles}>
                <Box xcss={inlineStyles}>
                    <AtlassianIcon appearance="brand" size="small" label="" />
                    <Heading level="h300">DSP-9786</Heading>
                </Box>
                <Inline space="space.100" alignBlock="center">
                    <BitbucketPullrequestsIcon size="small" label="" />
                    <MoreIcon size="small" label="" />
                    <Avatar size="small" />
                </Inline>
            </Box>

        </Stack>
    );
}

const defaultPreviouslySelected = ['2020-12-06'];
const defaultSelected = ['2020-12-08'];
interface President {
    id: number;
    name: string;
    party: string;
    term: string;
}
const presidents: President[] = [
    { id: 1, name: 'George Washington', party: 'Independent', term: '1789-1797' },
    { id: 2, name: 'John Adams', party: 'Federalist', term: '1797-1801' },
    { id: 3, name: 'Thomas Jefferson', party: 'Democratic-Republican', term: '1801-1809' },
    // Añade más presidentes si es necesario
];

function createKey(value: string): string {
    return value.toLowerCase().replace(/\s+/g, '-');
}



const head = [
    {
        key: createKey('Name'),
        content: 'Name',
    }
    ,
    {
        key: createKey('Party'),
        content: 'Party',
    },
    {
        key: createKey('Term'),
        content: 'Term',
    }
]
// applied as rows in the form
console.log(presidents)
const rows = presidents.map((president: President, index: number) => ({
    key: `row-${index}-${president.name}`,
    cells: [
        {
            key: createKey(president.name),
            content: (

                <Avatar name={president.name} size="medium" />


            ),
        },
        {
            key: createKey(president.party),
            content: president.party,
        },
        {
            key: president.id,
            content: president.term,
        },
    ]
}))



function DashBoard() {

    return (
        <div>
            <h1>Dash Board</h1>
            <ButtonGroup label="Default button group">
                <Button appearance="primary">Submit</Button>

            </ButtonGroup>
            <Example />
            <Calendar
                maxDate={'2020-12-25'}
                defaultPreviouslySelected={defaultPreviouslySelected}
                defaultSelected={defaultSelected}
                defaultMonth={12}
                defaultYear={2020}
                testId={'calendar'}
            />
            <DynamicTable
                caption="List of US Presidents"
                head={head}
                rows={rows}
                rowsPerPage={5}
                defaultPage={1}
                isFixedSize
                defaultSortKey="term"
                defaultSortOrder="ASC"
                onSort={() => console.log('onSort')}
                onSetPage={() => console.log('onSetPage')}
            />

        </div>
    )
}
export default DashBoard