import * as React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NumberedBadge from './NumberedBadge'; // Assuming your NumberedBadge component

// Create the Accordion component with props for summary, details, upvotes, etc.
const CustomAccordion = ({ summary, details, upvotes, reports }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {summary} {/* This will be customizable */}
      </AccordionSummary>
      <AccordionDetails>
        {details} {/* This will be customizable */}
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: "flex-start" }}>
        <NumberedBadge icon={<FlagIcon fontSize="medium" />} badgeContent={reports} />
        <NumberedBadge icon={<ThumbUpIcon fontSize="small" />} badgeContent={upvotes} />
      </AccordionActions>
    </Accordion>
  );
};

export default function App() {
  return (
    <div>
      <CustomAccordion
        summary="Comment 1"
        details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        upvotes={4}
        reports={1}
      />
      <CustomAccordion
        summary="Comment 2"
        details="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        upvotes={8}
        reports={2}
      />
    </div>
  );
}
