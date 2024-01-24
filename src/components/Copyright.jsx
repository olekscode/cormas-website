import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';

import {ReactComponent as CreativeCommonsSvg} from '../img/creativeCommons.svg';
import {ReactComponent as AttributionSvg} from '../img/attribution.svg';


export default function Copyright() {
  const creativeCommonsLicenseUrl = "http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1";
  const websiteGitHubUrl = "https://github.com/olekscode/cormas-website";
  const mitLicenseUrl = websiteGitHubUrl + "/blob/master/LICENSE";
  const ciradUrl = "https://cirad.fr";

  const creativeCommonsIcon = (<SvgIcon sx={{ fontSize: "small" }}><CreativeCommonsSvg/></SvgIcon>);
  const attributionIcon = (<SvgIcon sx={{ fontSize: "small" }}><AttributionSvg/></SvgIcon>);

  return (
    <Container>
      <Typography variant="body2" align="center" color="text.secondary">
        The source code of this website © by <Link href={ciradUrl} target="_blank" rel="noopener noreferrer">CIRAD</Link> is licensed under <Link href={mitLicenseUrl} target="_blank" rel="license noopener noreferrer">The MIT License</Link> and available on <Link href={websiteGitHubUrl} target="_blank" rel="noopener noreferrer">GitHub</Link>.
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
        The articles © by <Link href={ciradUrl} target="_blank" rel="noopener noreferrer">CIRAD</Link> are licensed under <Link href={creativeCommonsLicenseUrl} target="_blank" rel="license noopener noreferrer">CC BY 4.0</Link> <Link href={creativeCommonsLicenseUrl} underline="none" color="text.secondary" target="_blank" rel="license noopener noreferrer">{creativeCommonsIcon} {attributionIcon}</Link>
      </Typography>
    </Container>
  );
}